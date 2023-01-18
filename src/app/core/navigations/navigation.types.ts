import { IsActiveMatchOptions, Params, QueryParamsHandling } from '@angular/router';

// export type NavigationType = 'aside' | 'basic' | 'collapsable' | 'divider' | 'group' | 'spacer';
export type NavigationType = 'aside' | 'basic';
export type NavigationTarget = '_blank' | '_self' | '_parent' | '_top' | string;

export interface NavigationClasses {
  title?: string;
  sub_title?: string;
  icon?: string;
  wrapper?: string;
}

export interface NavigationBadge {
  title?: string;
  classes?: string;
}

export interface NavigationItem {
  id?: string;
  title?: string;
  sub_title?: string;
  type: NavigationType;
  hidden?: (item: NavigationItem) => boolean;
  active?: boolean;
  disabled?: boolean;
  tooltip?: string;
  link?: string;
  fragment?: string;
  preserveFragment?: boolean;
  queryParams?: Params | null;
  queryParamsHandling?: QueryParamsHandling | null;
  externalLink?: boolean;
  target?: NavigationTarget;
  exactMatch?: boolean;
  isActiveMatchOptions?: IsActiveMatchOptions;
  function?: (item: NavigationItem) => void;
  classes?: NavigationClasses;
  icon?: string;
  badge?: NavigationBadge;
  children?: NavigationItem[];
  meta?: any;
}

export interface NavigationStateModel {
  navigation: NavigationItem[];
  error: string | null;
  loading: boolean;
}
