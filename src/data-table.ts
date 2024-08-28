import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { provideFluentDesignSystem, fluentDataGrid, fluentDataGridRow, fluentDataGridCell, fluentCard } from '@fluentui/web-components';

provideFluentDesignSystem()
  .register(fluentDataGrid(), fluentDataGridRow(), fluentDataGridCell(), fluentCard());

interface TableData {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

@customElement('data-table')
export default class DataTable extends LitElement {
  @property({ type: Array }) data: TableData[] = [];

  static override styles = css`
    .custom-card {
      --card-width: 500px;
      --card-height: 400px;
      padding: 22px;
      margin: 200px auto 0px auto;
    }
    fluent-data-grid {
      width: 100%;
      border: 1px solid #ccc;
    }
  `;

  override async connectedCallback() {
    super.connectedCallback();
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    this.data = await response.json();
  }

  override render() {
    return html`
    <fluent-card class="custom-card">
      <fluent-design-system-provider use-defaults>
        <fluent-data-grid>
          <fluent-data-grid-row role="row" row-type="header">
            <fluent-data-grid-cell cell-type="columnheader" grid-column="1">ID</fluent-data-grid-cell>
            <fluent-data-grid-cell cell-type="columnheader" grid-column="2">Title</fluent-data-grid-cell>
            <fluent-data-grid-cell cell-type="columnheader" grid-column="3">Completed</fluent-data-grid-cell>
          </fluent-data-grid-row>
          ${this.data.map(todo => html`
            <fluent-data-grid-row role="row">
              <fluent-data-grid-cell grid-column="1">${todo.id}</fluent-data-grid-cell>
              <fluent-data-grid-cell grid-column="2">${todo.title}</fluent-data-grid-cell>
              <fluent-data-grid-cell grid-column="3">${todo.completed}</fluent-data-grid-cell>
            </fluent-data-grid-row>
          `)}
        </fluent-data-grid>
      </fluent-design-system-provider>
    </fluent-card>
    `;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'data-table': DataTable;
  }
}
