export enum Layout {
  // Empty
  EMPTY = 'EMPTY',
  // Horizontal
  ADMIN = 'ADMIN',
  // Vertical;
}

export interface LayoutStateModel {
  layout: Layout;
}
