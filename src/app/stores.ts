import { LayoutState } from './layout/layout.state';
import { AuthState } from 'src/app/core/auth/auth.state';
import { StateClass } from '@ngxs/store/internals';
import { NavigationState } from './core/navigations/navigation.state';

export const Stores: StateClass<any>[] | undefined = [AuthState, LayoutState, NavigationState];
