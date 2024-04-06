import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { Title, Card, Button } from 'react-native-paper';
import AddSkillsModal from './AddSkillsModal';

const AddSkillsScreen = () => {
  const [skillsAndLocation, setSkillsAndLocation] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleAddSkill = (newSkill) => {
    setSkillsAndLocation((prevData) => [...prevData, newSkill]);
  };

  const renderItem = ({ item }) => (
    <Card style={styles.skillCard} mode='outlined'>
      <Card.Content>
        <Text>Service: {item.skill}</Text>
        <Text>Location: {item.location}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Skills</Title>
      <Button mode="contained" onPress={toggleModal} textColor='white'>
        Add Skill
      </Button>

      {skillsAndLocation.length === 0 ? (
        <Text style={styles.noSkillsText}>No skills added yet.</Text>
      ) : (
        <FlatList
          data={skillsAndLocation}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.skillList}
        />
      )}

      {/* AddSkillsModal */}
      <AddSkillsModal
        visible={isModalVisible}
        onClose={toggleModal}
        onAddSkill={handleAddSkill}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: '#f93a13',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  skillCard: {
    marginBottom: 4,
    marginTop: 16,
    borderColor: '#f93a13',
  },
  skillList: {
    flex: 1,
  },
  noSkillsText: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
    color: '#333333',
  },
});

export default AddSkillsScreen;


