import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import Button from '@/components/Button';
import Card from '@/components/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verifica a autenticação ao carregar a tela
  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('userToken');
      setIsAuthenticated(!!token);
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    setIsAuthenticated(false);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        {!isAuthenticated ? (
          <View style={styles.container}>
            <Link href="/sign-in" asChild>
              <Button
                title="Sign In"
                onPress={() => router.push('/sign-in')}
                style={styles.button}
              />
            </Link>

            <Link href="/sign-up" asChild>
              <Button
                title="Sign Up"
                onPress={() => router.push('/sign-up')}
                style={styles.button}
              />
            </Link>
          </View>
        ) : (
          <View style={styles.container}>
            <Link href="/employee-form" asChild>
              <Button
                title="Employee Form"
                onPress={() => router.push('/employee-form')}
                style={styles.button}
              />
            </Link>

            <Button
              title="Logout"
              onPress={handleLogout}
              style={styles.button}
            />
          </View>
        )}
      </Card>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  card: {
   borderRadius: 50,
    padding: 80,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    marginVertical: 10,
    backgroundColor: 'gray', 
  },
});