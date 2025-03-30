import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
  Modal,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faSlidersH,
  faFutbol,
  faCalendarAlt,
  faTrophy,
  faMapMarkerAlt,
  faShoePrints,
} from '@fortawesome/free-solid-svg-icons';
import ValuePicker from '../common/ValuePicker';

// Constants
const positions = [
  'Goalkeeper (GK)',
  'Center Back (CB)',
  'Full Back (FB)',
  'Wing Back (WB)',
  'Defensive Midfielder (CDM)',
  'Central Midfielder (CM)',
  'Attacking Midfielder (CAM)',
  'Wide Midfielder (WM)',
  'Winger (RW/LW)',
  'Second Striker (SS)',
  'Forward (CF)',
  'Striker (ST)',
];

const ageCategories = [
  '18-25',
  '26-30',
  '31-35',
  '36-40',
  '41-45',
  '46-50',
  '51+',
];

const leagues = [
  {
    name: 'Super League Greece',
    divisions: ['Group A', 'Group B'],
  },
  {
    name: 'Football League Greece',
    divisions: ['North', 'South'],
  },
  {
    name: 'Gamma Ethniki',
    divisions: [
      'Group 1',
      'Group 2',
      'Group 3',
      'Group 4',
      'Group 5',
      'Group 6',
      'Group 7',
      'Group 8',
    ],
  },
];

const preferredFootOptions = ['Left', 'Right', 'Both'];

const AdvancedSearchScreen = () => {
  // Filter state
  const [filterType, setFilterType] = useState('Basic');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [selectedAgeCategory, setSelectedAgeCategory] = useState('');
  const [selectedLeague, setSelectedLeague] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('');
  const [availableDivisions, setAvailableDivisions] = useState([]);
  const [selectedPreferredFoot, setSelectedPreferredFoot] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Animation refs
  const sliderAnim = useRef(new Animated.Value(0)).current;
  const advancedAnim = useRef(new Animated.Value(0)).current;

  // Handlers for value changes
  const handlePositionChange = (value) => {
    setSelectedPosition(value);
  };

  const handleAgeCategoryChange = (value) => {
    setSelectedAgeCategory(value);
  };

  const handleLeagueChange = (value) => {
    setSelectedLeague(value);
    const leagueObj = leagues.find((league) => league.name === value);
    setAvailableDivisions(leagueObj ? leagueObj.divisions : []);
    setSelectedDivision('');
  };

  const handleDivisionChange = (value) => {
    setSelectedDivision(value);
  };

  const handlePreferredFootChange = (value) => {
    setSelectedPreferredFoot(value);
  };

  // Animation effect
  useEffect(() => {
    const target = filterType === 'Advanced' ? 1 : 0;
    Animated.parallel([
      Animated.timing(sliderAnim, {
        toValue: target,
        duration: 300,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(advancedAnim, {
        toValue: target,
        duration: 300,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, [filterType]);

  // Handle toggle switch
  const handleToggle = (type) => {
    if (type === 'Advanced' && filterType !== 'Advanced') {
      setShowModal(true); // Show modal when switching to Advanced
    }
    setFilterType(type);
  };

  // Toggle component
  const FilterToggle = () => {
    const sliderTranslateX = sliderAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 100],
    });
    return (
      <View
        style={[
          styles.toggleContainer,
          filterType === 'Advanced' && styles.advancedToggleContainer,
        ]}
      >
        <Animated.View
          style={[
            styles.toggleSlider,
            { transform: [{ translateX: sliderTranslateX }] },
            filterType === 'Advanced' && styles.advancedToggleSlider,
          ]}
        />
        {['Basic', 'Advanced'].map((type) => (
          <TouchableOpacity
            key={type}
            style={styles.toggleOption}
            onPress={() => handleToggle(type)}
          >
            <Text
              style={[
                styles.toggleText,
                filterType === type && styles.activeText,
                filterType === 'Advanced' && styles.advancedToggleText,
              ]}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        filterType === 'Advanced' && styles.advancedContainerTheme,
      ]}
      showsVerticalScrollIndicator={false}
    >
      <FilterToggle />

      {/* Premium Banner */}
      {filterType === 'Advanced' && (
        <View style={styles.premiumBanner}>
          <Text style={styles.premiumBannerText}>Welcome to Advanced Filters</Text>
          <Text style={styles.premiumBannerSubText}>
            Unlock premium features for a better experience.
          </Text>
        </View>
      )}

      {/* Modal for Advanced Feature */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Advanced Features</Text>
            <Text style={styles.modalText}>
              You are now accessing advanced filters, a premium feature. Enjoy enhanced search capabilities!
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.modalButtonText}>Got it!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Basic Filters Section */}
      <View style={styles.section}>
        <ValuePicker
          list={positions}
          selectedValue={selectedPosition}
          onValueChange={handlePositionChange}
          placeholder="Select Position"
          icon={faFutbol}
        />
        <ValuePicker
          list={ageCategories}
          selectedValue={selectedAgeCategory}
          onValueChange={handleAgeCategoryChange}
          placeholder="Age Category"
          icon={faCalendarAlt}
        />
      </View>

      {/* Advanced Filters Section */}
      <Animated.View
        style={[
          styles.advancedContainer,
          {
            transform: [{ scaleY: advancedAnim }],
            opacity: advancedAnim,
          },
        ]}
      >
        <View style={styles.advancedInner}>
          <View style={styles.advancedHeader}>
            <FontAwesomeIcon icon={faSlidersH} size={20} color="#6A0DAD" />
            <Text style={styles.advancedTitle}>Advanced Filters</Text>
          </View>
          <ValuePicker
            list={leagues.map((l) => l.name)}
            selectedValue={selectedLeague}
            onValueChange={handleLeagueChange}
            placeholder="Select League"
            icon={faTrophy}
          />
          <ValuePicker
            list={availableDivisions}
            selectedValue={selectedDivision}
            onValueChange={handleDivisionChange}
            placeholder="Division"
            icon={faMapMarkerAlt}
          />
          <ValuePicker
            list={preferredFootOptions}
            selectedValue={selectedPreferredFoot}
            onValueChange={handlePreferredFootChange}
            placeholder="Preferred Foot"
            icon={faShoePrints}
          />
        </View>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#F9F9FB',
  },
  advancedContainerTheme: {
    backgroundColor: '#F3E5F5', // Light purple background for Advanced mode
  },
  premiumBanner: {
    backgroundColor: '#6A0DAD',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  premiumBannerText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  premiumBannerSubText: {
    color: '#EDE7F6',
    fontSize: 14,
    marginTop: 4,
  },
  toggleContainer: {
    width: 200,
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: '#F0F0F5',
    borderRadius: 16,
    height: 48,
    marginBottom: 32,
    position: 'relative',
  },
  advancedToggleContainer: {
    backgroundColor: '#6A0DAD', // Purple background for Advanced toggle
  },
  toggleSlider: {
    position: 'absolute',
    height: 40,
    width: '50%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    margin: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  advancedToggleSlider: {
    backgroundColor: '#D1C4E9', // Light purple slider for Advanced mode
  },
  toggleOption: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  advancedToggleText: {
    color: '#FFFFFF', // White text for Advanced toggle
  },
  activeText: {
    color: '#2A2A2A',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  advancedContainer: {
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  advancedInner: {
    padding: 16,
  },
  advancedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  advancedTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#6A0DAD', // Purple text for Advanced title
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 24,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    color: '#333',
  },
  modalText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  modalButton: {
    backgroundColor: '#6A0DAD',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AdvancedSearchScreen;