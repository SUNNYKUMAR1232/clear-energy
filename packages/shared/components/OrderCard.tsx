import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CylinderIcon } from './Icons';
import { OrderCardData } from '../types/order';

export interface OrderCardProps {
    data: OrderCardData;
    onPress?: () => void;
}

export function OrderCard({ data, onPress }: OrderCardProps) {
    const { id, title, subtitle, badge, trailing, iconText, mode, isBreached } = data;
    
    if (mode === 'admin') {
        const theme = badge || 'slate';
        let idColor = '#10B981'; // emerald
        let btnBg = '#0F766E';
        let btnText = '#FFFFFF';
        
        if (theme === 'amber') idColor = '#D97706';
        if (theme === 'violet') {
            idColor = '#7C3AED';
            btnBg = '#EDE9FE';
            btnText = '#7C3AED';
        }

        return (
            <View style={styles.adminRow}>
                <View style={styles.adminRowContent}>
                    <Text style={[styles.adminId, { color: idColor }]}>{id}</Text>
                    <Text style={styles.adminTitle} numberOfLines={1}>{title}</Text>
                    <Text style={[styles.adminSubtitle, isBreached ? styles.adminBreached : null]}>
                        {subtitle}
                    </Text>
                </View>
                <TouchableOpacity style={[styles.adminBtn, { backgroundColor: btnBg }]}>
                    <Text style={[styles.adminBtnText, { color: btnText }]}>
                        {trailing === 'Approve' ? '✓ Approve' : trailing}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (mode === 'customer') {
        let statusColor = '#64748B'; // slate
        if (badge === 'active' || badge === 'out_for_delivery') statusColor = '#059669'; // emerald
        if (badge === 'cancelled' || badge === 'returned') statusColor = '#E11D48'; // rose

        return (
            <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7} disabled={!onPress}>
                <View style={[styles.row, { alignItems: 'flex-start' }]}>
                    <View style={styles.customerIconBox}>
                        <CylinderIcon color="#EA580C" size={24} />
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.idText}>{id}</Text>
                        <Text style={styles.customerTitle} numberOfLines={1}>{title}</Text>
                        <Text style={[styles.customerSubtitle, { color: statusColor }]} numberOfLines={1}>
                            {subtitle}
                        </Text>
                    </View>
                    {trailing && <Text style={styles.customerTrailing}>{trailing}</Text>}
                </View>
            </TouchableOpacity>
        );
    }
    
    // Driver Mode
    return (
        <TouchableOpacity style={[
            styles.card, 
            badge === 'active' ? styles.activeDriverBorder : null
        ]} onPress={onPress} activeOpacity={0.7} disabled={!onPress}>
            <View style={styles.row}>
                <View style={[styles.driverIconBox, getDriverIconBoxStyle(badge)]}>
                    <Text style={[styles.driverIconText, getDriverIconTextStyle(badge)]}>
                        {iconText || 'O'}
                    </Text>
                </View>

                <View style={styles.content}>
                    <Text style={styles.driverIdText}>{id}</Text>
                    <Text style={styles.driverTitle} numberOfLines={1}>{title}</Text>
                    <Text style={styles.driverSubtitle} numberOfLines={1}>{subtitle}</Text>
                </View>

                {trailing && (
                    <View style={styles.driverActionBtn}>
                        <Text style={styles.driverActionBtnText}>{trailing}</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
}

function getDriverIconBoxStyle(status?: string) {
    if (status === 'active') return { backgroundColor: '#0F766E' };
    if (status === 'done') return { backgroundColor: '#D1FAE5' };
    return { backgroundColor: '#F1F5F9', borderWidth: 1, borderColor: '#E2E8F0' }; 
}

function getDriverIconTextStyle(status?: string) {
    if (status === 'active') return { color: '#FFFFFF' };
    if (status === 'done') return { color: '#059669' };
    return { color: '#475569' };
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginVertical: 6,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    activeDriverBorder: {
        borderWidth: 1,
        borderColor: '#0F766E',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    content: {
        flex: 1,
    },
    // Driver Styles
    driverIconBox: {
        width: 40,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },
    driverIconText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    driverIdText: {
        fontSize: 11,
        color: '#64748B',
        fontFamily: 'monospace',
        marginBottom: 2,
    },
    driverTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 2,
    },
    driverSubtitle: {
        fontSize: 12,
        color: '#64748B',
    },
    driverActionBtn: {
        backgroundColor: '#0F766E',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        marginLeft: 12,
    },
    driverActionBtnText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '700',
    },
    // Customer Styles
    idText: {
        fontSize: 12,
        color: '#64748B',
        fontFamily: 'monospace',
    },
    customerTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0F172A',
        marginTop: 2,
    },
    customerIconBox: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: '#FFEDD5',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    customerIcon: {
        fontSize: 20,
    },
    customerSubtitle: {
        fontSize: 12,
        fontWeight: '600',
        marginTop: 4,
    },
    customerTrailing: {
        fontSize: 12,
        color: '#94A3B8',
    },
    // Admin Styles
    adminRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
    },
    adminRowContent: {
        flex: 1,
        marginRight: 12,
    },
    adminId: {
        fontFamily: 'monospace',
        fontSize: 12,
        fontWeight: '700',
        marginBottom: 2,
    },
    adminTitle: {
        fontSize: 13,
        fontWeight: '500',
        color: '#334155',
        marginBottom: 2,
    },
    adminSubtitle: {
        fontSize: 11,
        color: '#94A3B8',
    },
    adminBreached: {
        color: '#E11D48',
        fontWeight: '700',
    },
    adminBtn: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    adminBtnText: {
        fontSize: 11,
        fontWeight: '700',
    }
});
