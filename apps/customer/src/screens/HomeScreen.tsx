import React, { useState, useMemo } from 'react';
import { SafeAreaView, FlatList, ActivityIndicator, Text, StyleSheet, View, TouchableOpacity, TextInput } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { OrderCard, getOrders, SearchIcon } from '@clear-energy/shared'; 

export function HomeScreen() {
  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ['orders', 'c-001'],
    queryFn: ({ signal }) => getOrders('c-001', signal)
  });

  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const filters = ['All', 'Active', 'Delivered', 'Returns'];

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter((item) => {
      // Filter by chip status
      if (activeFilter === 'Active' && !(item.badge === 'active' || item.badge === 'out_for_delivery')) return false;
      if (activeFilter === 'Delivered' && item.badge !== 'done') return false; 
      if (activeFilter === 'Returns' && !(item.badge === 'cancelled' || item.badge === 'returned')) return false;

      // Filter by search query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!item.title.toLowerCase().includes(q) && !item.id.toLowerCase().includes(q)) {
          return false;
        }
      }
      return true;
    });
  }, [data, activeFilter, searchQuery]);

  if (isLoading) {
    return <View style={styles.center}><ActivityIndicator size="large" color="#0F766E" /></View>;
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Failed to load orders.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {isSearching ? (
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search orders by ID or SKU..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
            <TouchableOpacity onPress={() => { setIsSearching(false); setSearchQuery(''); }}>
              <Text style={styles.cancelSearch}>Cancel</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={styles.headerTitle}>My Orders</Text>
            <TouchableOpacity onPress={() => setIsSearching(true)}>
              <SearchIcon color="#334155" size={20} />
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Filter Chips */}
      <View style={styles.chipContainer}>
        {filters.map((f) => {
          const isActive = activeFilter === f;
          return (
            <TouchableOpacity 
              key={f} 
              style={[styles.chip, isActive ? styles.chipActive : styles.chipInactive]}
              onPress={() => setActiveFilter(f)}
            >
              <Text style={[styles.chipText, isActive ? styles.chipTextActive : styles.chipTextInactive]}>
                {f}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OrderCard data={item} />}
        contentContainerStyle={styles.list}
        onRefresh={refetch}
        refreshing={isFetching && !isLoading}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No orders match your filter/search.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  list: { paddingVertical: 8 },
  errorText: { color: '#DC2626', fontSize: 16, fontWeight: '600' },
  empty: { padding: 24, alignItems: 'center' },
  emptyText: { color: '#6B7280', fontSize: 16 },
  
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  searchIcon: {
    fontSize: 20,
    color: '#334155',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 36,
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#0F172A',
    marginRight: 12,
  },
  cancelSearch: {
    color: '#0F766E',
    fontWeight: '600',
    fontSize: 14,
  },

  chipContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: '#0F766E',
  },
  chipInactive: {
    backgroundColor: '#F1F5F9',
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
  chipTextInactive: {
    color: '#475569',
  },
});
