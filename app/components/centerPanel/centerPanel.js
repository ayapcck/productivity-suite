import React from 'react';

import styles from './centerPanel.less';

export default class CenterPanel extends React.Component {
  render() {
    var centeredPanel = <div className={styles.centeredBox}>
		{this.props.content}
	</div>
	return centeredPanel;
  }
}