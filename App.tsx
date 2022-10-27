import React from 'react';
import './src/firebase/firebaseApp';
import RootNavigation from './src/navigation';
import {AppProvider, UserProvider, useUser} from '@realm/react';
import appId from './app.json';
import baseUrl from './app.json';
import {View, ActivityIndicator} from 'react-native';
import RealmContext from './RealmContext';
const {RealmProvider} = RealmContext;

export default function App() {
  return (
    <AppProvider id={appId} baseUrl={baseUrl}>
      {/* After login, user will be automatically populated in realm configuration */}
      <RealmProvider
        sync={{
          flexible: true,
          initialSubscriptions: {
            update: (subs, realm) => {
              // subscribe to all of the logged in user's to-do items
              subs.add(realm.objects('Item'), {name: 'ownItems'});
            },
          },
        }}
        fallback={() => (
          <View>
            <ActivityIndicator size="large" />
          </View>
        )}>
        <RootNavigation />
      </RealmProvider>
    </AppProvider>
  );
}
