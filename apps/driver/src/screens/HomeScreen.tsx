import React from 'react';
import { SafeAreaView, FlatList, ActivityIndicator, Text, StyleSheet, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { OrderCard, getTrips, TruckIcon, CompassIcon, MapTrack } from '@clear-energy/shared';

export function HomeScreen() {
  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ['trips', 'd-101'],
    queryFn: ({ signal }) => getTrips('d-101', signal)
  });

  if (isLoading) {
    return <View style={styles.center}><ActivityIndicator size="large" color="#0F766E" /></View>;
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Failed to load trip stops.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OrderCard data={item} />}
        contentContainerStyle={styles.list}
        onRefresh={refetch}
        refreshing={isFetching && !isLoading}
        ListHeaderComponent={
          <View style={styles.mapPlaceholder}>
             <View style={styles.etaBadge}>
                 <View style={styles.etaDot} />
                 <Text style={styles.etaText}>ETA next stop • <Text style={{color: '#0F766E'}}>8 min</Text></Text>
             </View>
             
             <MapTrack />
             <View style={[styles.truckIconBox, { top: '35%', left: '40%', position: 'absolute' }]}>
                 <TruckIcon color="#FFFFFF" size={20} />
             </View>

             <View style={styles.navFab}>
                <CompassIcon color="#0F172A" size={20} />
             </View>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No trips assigned for today.</Text>
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
  mapPlaceholder: {
    height: 180,
    backgroundColor: '#F0FDF4',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#DCFCE7'
  },
  etaBadge: {
    position: 'absolute',
    top: 16,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    zIndex: 10,
  },
  etaDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#10B981', marginRight: 6 },
  etaText: { fontSize: 12, fontWeight: '600', color: '#334155' },
  navFab: { position: 'absolute', bottom: 16, right: 16, width: 44, height: 44, backgroundColor: '#FFFFFF', borderRadius: 22, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 4, elevation: 3 },
  mapPathContainer: { flex: 1, position: 'relative', marginTop: 40 },
  mapDot: { position: 'absolute', width: 10, height: 10, borderRadius: 5, backgroundColor: '#0F766E' },
  truckIconBox: { position: 'absolute', width: 28, height: 28, borderRadius: 14, backgroundColor: '#0F766E', alignItems: 'center', justifyContent: 'center' },
});
