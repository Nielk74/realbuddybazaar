import React from 'react';
import { SafeAreaView } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { store } from './store/store';
import theme from './theme';
import Navigation from './pages/navigation/Navigation';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';

export default function App() {
	return (
		<PaperProvider theme={theme}>
			<AutocompleteDropdownContextProvider>
				<SafeAreaView style={{ flex: 1 }}>
					<Provider store={store}>
						<Navigation />
					</Provider>
				</SafeAreaView>
			</AutocompleteDropdownContextProvider>
		</PaperProvider>
	);
}
