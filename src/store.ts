import {
  init,
  RematchRootState,
  Models,
  ModelEffects,
  ModelConfig,
} from '@rematch/core'
import createLoadingPlugin from '@rematch/loading'
import * as models from './models'

const loadingPlugin = createLoadingPlugin({})

export type ExtractRematchLoadingFromEffects<
  effects extends ModelConfig['effects']
> = effects extends (...args: any[]) => infer R
  ? R extends ModelEffects<any>
    ? ExtractRematchLoadingFromEffectsObject<R>
    : {}
  : effects extends ModelEffects<any>
  ? ExtractRematchLoadingFromEffectsObject<effects>
  : {}

export type ExtractRematchLoadingFromEffectsObject<
  effects extends ModelEffects<any>
> = { [effectKey in keyof effects]: boolean }

interface ILoadingState<M extends Models> {
  loading: {
    global: boolean
    models: { [k in keyof M]: boolean }
    effects: {
      [k in keyof M]: ExtractRematchLoadingFromEffects<M[k]['effects']>
    }
  }
}

export const store = init({
  models,
  plugins: [loadingPlugin],
})

export type Store = typeof store
export type Dispatch = typeof store.dispatch
export type IRootState = RematchRootState<typeof models> &
  ILoadingState<typeof models>
