import { ChangeLayout } from './layout.actions';
import { Layout, LayoutStateModel } from './layout.types';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';

@State<LayoutStateModel>({
  name: 'layout',
  defaults: {
    layout: Layout.EMPTY,
  },
})
@Injectable()
export class LayoutState {
  constructor() {}

  @Selector([LayoutState])
  static layout(state: LayoutStateModel) {
    return state.layout;
  }

  @Action(ChangeLayout)
  changeLayout({ getState, patchState }: StateContext<LayoutStateModel>, { layout }: ChangeLayout) {
    return patchState({
      ...getState(),
      layout,
    });
  }
}
