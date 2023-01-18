import { ChangeLayout } from './layout.actions';
import { ActivatedRoute, ActivationStart, NavigationEnd, Router } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { LayoutState } from './layout.state';
import { Layout } from './layout.types';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LayoutComponent implements OnInit {
  @Select(LayoutState.layout) layout$!: Observable<Layout>;

  constructor(private store: Store, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.store.dispatch(new ChangeLayout(data['layout']));
    });
  }

  get LayoutType(): typeof Layout {
    return Layout;
  }
}
