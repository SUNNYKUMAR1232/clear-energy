import React from 'react';
import { SafeAreaView, ActivityIndicator, Text, StyleSheet, View, ScrollView } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { OrderCard, getPendingActions, BanknoteIcon, PackageIcon, UserPlusIcon, FilterIcon, ClipboardListIcon, ArrowLeftIcon, ZapIcon } from '@clear-energy/shared';

export function HomeScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['actions', 'a-201'],
    queryFn: ({ signal }) => getPendingActions('a-201', signal)
  });

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0F766E" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Failed to load actions.</Text>
      </View>
    );
  }

  // Group by theme (which we mapped from category)
  const grouped = data?.reduce((acc: any, item: any) => {
    const cat = item.badge || 'slate';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});
  
  const categories = Object.keys(grouped || {});

  if (categories.length === 0) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.emptyText}>All caught up! No pending actions.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.headerBlock}>
        <View style={styles.headerTop}>
          <View style={styles.headerTitleContainer}>
            <ArrowLeftIcon color="#FFFFFF" size={20} />
            <View style={styles.titleWithZap}>
              <ZapIcon color="#FBBF24" size={16} />
              <Text style={styles.headerTitle}>Pending Actions</Text>
            </View>
          </View>
          <FilterIcon color="#FFFFFF" size={20} />
        </View>
        <View style={styles.headerStatsRow}>
          <Text style={styles.headerBigNum}>{data?.length || 0}</Text>
          <Text style={styles.headerStatsText}>items across {categories.length} categories</Text>
        </View>
        <Text style={styles.headerSub}>Sorted by SLA-breach risk · Banjara Hills</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {categories.map(cat => {
          const items = grouped[cat];
          const isEmerald = cat === 'emerald';
          const isAmber = cat === 'amber';
          const isViolet = cat === 'violet';

          const borderColor = isEmerald ? '#A7F3D0' : isAmber ? '#FDE68A' : isViolet ? '#DDD6FE' : '#E2E8F0';
          const headerBg = isEmerald ? '#ECFDF5' : isAmber ? '#FFFBEB' : isViolet ? '#F5F3FF' : '#F8FAFC';
          const headerBorder = isEmerald ? '#D1FAE5' : isAmber ? '#FEF3C7' : isViolet ? '#EDE9FE' : '#F1F5F9';
          
          let title = 'Tasks';
          let IconComponent = ClipboardListIcon;
          let slaStr = '60m';

          if (isEmerald) { title = 'Cash'; IconComponent = BanknoteIcon; slaStr = '60m'; }
          if (isAmber) { title = 'MI Empty'; IconComponent = PackageIcon; slaStr = '24h'; }
          if (isViolet) { title = 'Unassigned orders'; IconComponent = UserPlusIcon; slaStr = '60m'; }

          const breachedCount = items.filter((i: any) => i.isBreached).length;
          const breachedText = breachedCount > 0 ? ` · ${breachedCount} breached` : '';

          return (
            <View key={cat} style={[styles.categoryBlock, { borderColor }]}>
              <View style={[styles.categoryHeader, { backgroundColor: headerBg, borderBottomColor: headerBorder }]}>
                <View style={styles.catHeaderRow}>
                  <View style={[styles.catIconBox, { backgroundColor: headerBorder }]}>
                    <IconComponent color="#475569" size={16} />
                  </View>
                  <View>
                    <Text style={styles.categoryTitle}>{title}</Text>
                    <Text style={styles.categorySub}>SLA {slaStr} - {items.length} pending{breachedText}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.categoryItems}>
                {items.map((item: any, idx: number) => (
                  <View key={item.id} style={idx > 0 ? styles.divider : null}>
                    <OrderCard data={item} />
                  </View>
                ))}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerBlock: {
    backgroundColor: '#0F766E',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerFilter: {
    color: '#FFFFFF',
    fontSize: 16,
    transform: [{ scaleX: 1.5 }],
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleWithZap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  headerStatsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 4,
  },
  headerBigNum: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 36,
    marginRight: 8,
  },
  headerStatsText: {
    color: '#FFFFFF',
    opacity: 0.8,
    fontSize: 12,
    marginBottom: 6,
  },
  headerSub: {
    color: '#FFFFFF',
    opacity: 0.8,
    fontSize: 11,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  categoryBlock: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
    overflow: 'hidden',
  },
  categoryHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  catHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  catIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  catIconText: {
    fontSize: 16,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  categorySub: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
  },
  categoryItems: {
    backgroundColor: '#FFFFFF',
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  errorText: { color: '#DC2626', fontSize: 16, fontWeight: '600' },
});
