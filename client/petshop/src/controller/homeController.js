//@flow

import React, { Component } from 'react';
import {
	View,
	Alert,
	Text,
	TouchableHighlight,
	ListView,
	StyleSheet
} from 'react-native';

import Button from '../view/touchableButton';
// import BaseListController, {TableStyle} from './baseListController';
import PetListController from './petListController';

type State = {
	message: string,
	dataSource: ListView.DataSource
};

export default class HomeController extends Component {
	state: State;

	constructor(props) {
		super(props);

		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			message: '',
			dataSource: ds.cloneWithRows(['Micheal', 'Jack', 'Paul'])
		};
	}

	fetchAction() {
		this.setState({ message: 'Empty' });

		const init = {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer 8d9bd601f9461955b330d88c44f2930257364de98cddc2064d93cdcb300cb91d',
			},
			// body: JSON.stringify({
			//
			// })
		};

		fetch('https://api.dribbble.com/v1/shots', init)
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({ message: `${responseJson[0].id} - ${responseJson[0].title}` });
			})
			.catch(e => { console.log(`error ${e}`) });
	}

	_renderRow(data: string, sectionID: number, rowID: number,
		highlightRow: (sectionID: number, rowID: number) => void) {
		return (
			<TouchableHighlight
				key={`${sectionID}-${rowID}`}
				onPress={() => {
					this._onPressRow(rowID);
					highlightRow(sectionID, rowID);
				}}>
				<View style={styles.row}>
					<Text style={styles.text}>{data}</Text>
				</View>
			</TouchableHighlight>
		);
	}

	_renderSeparator(sectionID: number, rowID: number) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: 1,
          backgroundColor: 'black',
        }}
      />
    );
  }

	_onPressRow(rowID: number) {
		this.props.navigator.push({
			title: 'Pets',
			component: PetListController,
			passProps: {}
		});
	}

	render() {
		return (
			<View style={{flex: 1, marginTop: 64}}>
				<ListView
					dataSource={this.state.dataSource}
					renderRow={this._renderRow.bind(this)}
					renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => <View
						key={`${sectionID}-${rowID}`}
						style={{
							height: 1,
							backgroundColor: '#CCCCCC',
						}}
					/>}
				/>
			</View>
		);
	}
};

var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  thumb: {
    width: 64,
    height: 64,
  },
  text: {
    flex: 1,
  },
});
