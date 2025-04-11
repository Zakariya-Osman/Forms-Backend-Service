import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useRouter } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import * as Yup from 'yup';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Card from '@/components/Card';

const EmployeeSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone is required'),
  position: Yup.string().required('Position is required'),
  department: Yup.string().required('Department is required'),
});

const EmployeeForm = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Formik
          initialValues={{ name: '', email: '', phone: '', position: '', department: '' }}
          validationSchema={EmployeeSchema}
          onSubmit={(values) => {
            console.log(values);
            router.push('/');
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <Form style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Full Name</Text>
                <Input
                  placeholder="Full Name"
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                />
                {errors.name && touched.name && <Text style={styles.error}>{errors.name}</Text>}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email Address</Text>
                <Input
                  placeholder="Email Address"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  keyboardType="email-address"
                />
                {errors.email && touched.email && <Text style={styles.error}>{errors.email}</Text>}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Phone Number</Text>
                <Input
                  placeholder="Phone Number"
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  keyboardType="phone-pad"
                />
                {errors.phone && touched.phone && <Text style={styles.error}>{errors.phone}</Text>}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Position</Text>
                <Input
                  placeholder="Position"
                  value={values.position}
                  onChangeText={handleChange('position')}
                  onBlur={handleBlur('position')}
                />
                {errors.position && touched.position && <Text style={styles.error}>{errors.position}</Text>}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Department</Text>
                <Input
                  placeholder="Department"
                  value={values.department}
                  onChangeText={handleChange('department')}
                  onBlur={handleBlur('department')}
                />
                {errors.department && touched.department && <Text style={styles.error}>{errors.department}</Text>}
              </View>

              <View style={styles.buttonRow}>
                <Button
                  title="Cancel"
                  onPress={() => router.push('/')}
                  style={styles.cancelButton}
                />
                <Button
                  title="Submit"
                  onPress={handleSubmit}
                  style={styles.submitButton}
                />
              </View>
            </Form>
          )}
        </Formik>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
    maxWidth: 400,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#333',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#f44336',
    flex: 1,
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: '#44613A',
    flex: 1,
    marginLeft: 10,
  },
});

export default EmployeeForm;