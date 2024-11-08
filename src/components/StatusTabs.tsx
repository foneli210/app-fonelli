import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const StatusTabs = ({activeTab, onTabChange}: any) => {
  const tabs = ['Todos', 'Capturado', 'Solicitado'];

  return (
    <View style={styles.tabContainer}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, activeTab === tab && styles.activeTab]}
          onPress={() => onTabChange(tab)}>
          <Text
            style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default StatusTabs;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 12,
    borderRadius: 20,
  },
  tabText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  activeTab: {
    backgroundColor: '#1E3A8A',
  },
});
