import _ from 'lodash';
import React from 'react';

import { BaseComponent } from '../base';
import Interactive from '../interactive';
import Entity from '../entity';

import style from './style.css';

export default class Service extends BaseComponent {
  state = {
    version: 'v1',
    hidden: false,
  }

  handleToggle() {
    const { hidden } = this.state;
    return this.setState({ hidden: !hidden });
  }

  handleVersionChange(e, version) {
    return this.setState({ version });
  }

  renderVersion({ version }) {
    const isSelected = this.state.version === version;

    return (
      <Interactive
        type="radio"
        key={version}
        checked={isSelected}
        className={`${style.service.version} ${isSelected && style.service.version.selected}`}
        onChange={e => this.handleVersionChange(e, version)}
      >
        { version }
      </Interactive>
    );
  }

  renderChild({ model, entity }) {
    const { service, filter } = this.props;
    const { version } = this.state;

    const props = {
      key: entity,
      service,
      version,
      entity,
      model,
      filter,
    };

    return <Entity {...props} />;
  }

  render() {
    const { service, model } = this.props;
    const { version, hidden } = this.state;

    const entities = model[version];

    return (
      <div className={style.service}>
        <header className={style.service.header}>
          <Interactive
            type="checkbox"
            checked={hidden}
            className={style.service.header.toggle}
            onChange={e => this.handleToggle(e)}
          >
            { service }
          </Interactive>
          <div className={style.service.versions}>
            {
              _.map(model, (entites, v) => this.renderVersion({ version: v, entites }))
            }
          </div>
        </header>
        <div className={`${style.service.content} ${hidden && style.service.content.hidden}`}>
          {
            Object.keys(entities)
              .sort()
              .map(entity => this.renderChild({ entity, model: entities[entity] }))
          }
        </div>
      </div>
    );
  }
}
