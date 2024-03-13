# XState / Jotai

# XState

## 有限狀態機

<https://zh.wikipedia.org/zh-tw/%E6%9C%89%E9%99%90%E7%8A%B6%E6%80%81%E6%9C%BA>

> 是表示有限個[狀態](https://zh.wikipedia.org/wiki/%E7%8A%B6%E6%80%81 "狀態")以及在這些狀態之間的轉移和動作等行為的[數學計算模型](https://zh.wikipedia.org/wiki/%E8%AE%A1%E7%AE%97%E6%A8%A1%E5%9E%8B\_\\(%E6%95%B0%E5%AD%A6\\) "計算模型 (數學)")。

> - 進入動作（entry action）：在進入狀態時進行 
>
> - 退出動作（exit action）：在退出狀態時進行
>
> - 輸入動作：依賴於當前狀態和輸入條件進行
>
> - 轉移動作：在進行特定轉移時進行



## XState API 重點整理

不考慮 XState Machine 其他功能 ，一個狀態機有以下兩個核心重點

### `states` : 該狀態機（第一層級）所有狀態

```ts
const myMachine = createMachine({
  states: {
    s1:{
      //...
    },
    s2:{
      //...
    },
    s3:{
      //...
    }
  }
})
```

### `on` : 該狀態進行狀態切換的所有事件 (event)

```ts
const myMachine = createMachine({
  states: {
    s1:{
      on:{
        GO: 's2' // 觸發 GO 事件，狀態會切到 s2
      }
    },
    s2:{
      //...
    },
    s3:{
      //...
    }
  }
})
```

剩下的什麼 action, guard 等等都圍繞在狀態切換之間，所以思考模式應該是透過切換狀態使一系列事件發生，與一般狀態管理透過事件/動作去改變狀態(這裡的狀態與狀態機的狀態意義不同)相反。

更白話的說，狀態機透過定義狀態圖來限制我們能做什麼操作，避免一般開發過度自由的更新改變上下文難以追蹤上下文如何變化。

備註：在使用 XState 時應該要先為每個 machine 擬一個狀態圖，才開始帶入各狀態轉換時該做什麼

## Promise API machine

```ts
import { createMachine, fromPromise, assign } from 'xstate';

type ApiMachineContext<T> =
  | {
      status: 'idle';
    }
  | {
      status: 'pending';
    }
  | {
      status: 'success';
      data: T;
    }
  | {
      status: 'fail';
      error: unknown;
    };

type ApiMachineEvent<P> =
  | {
      type: 'START';
      params: P;
    }
  | {
      type: 'REFETCH';
      params: P;
    };

export const createApiMachine = <P, T>(fn: (params: P) => Promise<T>) =>
  createMachine({
    types: {} as {
      context: ApiMachineContext<T>;
      evens: ApiMachineEvent<P>;
    },
    context: { status: 'idle' },
    initial: 'idle',
    states: {
      idle: {
        on: {
          START: 'pending',
        },
      },
      pending: {
        entry: assign<ApiMachineContext<T>>({ status: 'pending' }),
        invoke: {
          src: fromPromise<T, P>(({ input: params }) => fn(params)),
          input: ({ event: { params } }) => params,

          onDone: {
            target: 'resolved',
            actions: assign<ApiMachineContext<T>>(({ event }) => ({
              status: 'success',
              data: event.output,
            })),
          },
          onError: {
            target: 'rejected',
            actions: assign<ApiMachineContext<T>>(({ event }) => ({
              status: 'fail',
              data: event.error,
            })),
          },
        },
      },
      resolved: {
        on: {
          REFETCH: 'pending',
        },
      },
      rejected: {
        on: {
          REFETCH: 'pending',
        },
      },
    },
  });

export type ApiStateMachine<P, T> = ReturnType<typeof createApiMachine<P, T>>;

```



## Actor

一個狀態機被建立是靜止的，必須轉成 Actor 去啟動並觸發事件，

> When you run a state machine, it becomes an actor: a running process that can **receive events**, **send events** and **change its behavior based on the events it receives**, which can cause effects outside of the actor.

`createActor` 接受一個可被轉成 actor logic 的事物，而狀態機本身就是。

文件上的 `fromPromise`, `fromTransition`, `fromObservable`, `fromEventObservable`, `fromCallback` 之所以可以用 `createActor` 是因為這些情境可以被表示成 actor logic。

你也可以自己建立一個 actor logic

<https://stately.ai/docs/actors#custom-actor-logic>



補充：Actor model 概念本身不限於 XState，也會被應用到並行運算

## XState / Jotai 使用比較

### XState

優點

- 行為受狀態所約束，在使用上較不容易執行錯誤的動作

- 強迫開發者在開發前先擬狀態圖，能夠提早發現流程上的瑕疵

- 狀態機概念的思考模式本身具有一定價值，即便不使用 XState 也能提升開發思維

缺點

- 因為每個狀態機都是針對解決特定情境誕生的，在各狀態機組合考驗的是開發者對狀態機的理解程度，白話一點就是「寫一個狀態機不難，但設計一個好的狀態機很難」

- type 相對複雜許多，會花費很多時間在寫出理想正確的型別

- 沒有一點狀態機背景，前期學習成本相對高許多

### Jotai

優點

- 本身概念非常單純，掌握基本概念就可以輕鬆使用

- atom base 具有組合性強的優勢，分類後組合比拆碎後分類更輕鬆

- 在合法使用的情況下，能自己實現的附加功能較多元

缺點

- 因為彈性夠大，所以在狀態處理上要更小心，思考的狀況要更多，比如任何對 atom 的 set 修改都要留意會影響多少元件及商業邏輯行為。\
   解法：對某些重要的 atom 的操控多加限制，規範開發者不要直接對該 atom 設值，只使用已定義好的方法

- 資料更為分散，在使用上自由，但在管理 atom 及分類上要多加規範避免失控