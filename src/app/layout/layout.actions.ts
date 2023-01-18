import { Layout } from 'src/app/layout/layout.types';

export class ChangeLayout {
  static readonly type = '[Layout] Change Layout';
  constructor(public layout: Layout) {}
}
