import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import { Button, Divider } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getOwnActivities } from '../../store/thunks/activitiesThunk';
import ActivityCard from '../../components/activity/ActivityCard';
import TitleMedium from '../../components/shared/typography/TitleMedium';
import TitleSmall from '../../components/shared/typography/TitleSmall';
import theme from '../../theme';
import { useIsFocused } from '@react-navigation/native';

const MyActivitiesPage = ({ navigation }) => {
  const isFocused = useIsFocused();
  const userId = useSelector((state) => state.auth.id);
  const userActivities = useSelector(
    (state) => state.activities.userActivities
  );
  const [ownedActivities, registeredActivities] = userActivities.reduce(
    ([owned, registered], activity) => {
      if (activity.userId === userId) {
        owned.push(activity);
      }
      if (activity.participants?.includes(userId)) {
        registered.push(activity);
      }
      return [owned, registered];
    },
    [[], []]
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFocused) {
      dispatch(getOwnActivities());
    }
  }, [isFocused]);

  const createActivity = () => {
    navigation.navigate('ActivityForm');
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.viewContainer}>
          <TitleMedium>Mes activités</TitleMedium>
          <View style={styles.activitiesContainer}>
            <TitleSmall>Activités créées</TitleSmall>
            <Button mode="contained" icon="clipboard-plus-outline" onPress={createActivity} nativeID="newActivityButton">Créer une activité</Button>
            <View style={styles.activitiesSubContainer}>
              {ownedActivities &&
                ownedActivities.map((activity) => {
                  return (
                    <ActivityCard
                      key={activity.id}
                      activity={activity}
                      imageHeight={150}
                      width={
                        Dimensions.get('window').width < 500 ? 'auto' : 300
                      }
                      navigation={navigation}
                    />
                  );
                })}
            </View>
          </View>
          <View style={styles.activitiesContainer}>
            <Divider
              style={{ backgroundColor: theme.colors.tertiaryContainer }}
            />
            <TitleSmall>Inscriptions</TitleSmall>
            <View style={styles.activitiesSubContainer}>
              {registeredActivities &&
                registeredActivities.map((activity) => {
                  return (
                    <ActivityCard
                      key={activity.id}
                      activity={activity}
                      imageHeight={150}
                      width={
                        Dimensions.get('window').width < 500 ? 'auto' : 300
                      }
                      navigation={navigation}
                    />
                  );
                })}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  activitiesSubContainer: {
    flexGrow: Dimensions.get('window').width < 500 ? 1 : 0,
    gap: 18,
    flexDirection: Dimensions.get('window').width < 500 ? 'column' : 'row',
    flexWrap: Dimensions.get('window').width < 500 ? 'nowrap' : 'wrap',
  },
  activitiesContainer: {
    gap: 18,
    marginBottom: 18,
  },
  viewContainer: {
    gap: 18,
    margin: 18,
  },
});

export default MyActivitiesPage;
