import React, { useState } from "react";
import { Formik } from "formik";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import * as Yup from "yup";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Card from "@/components/Card";
import { addEmployee, Employee } from "@/services/employeeService";

const EmployeeSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  position: Yup.string().required("Position is required"),
  department: Yup.string().required("Department is required"),
});

const EmployeeForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (values: Omit<Employee, "id">) => {
    try {
      setIsSubmitting(true);

      await addEmployee(values);
      Alert.alert("Success", "Employee added successfully");
      router.push("/");
    } catch (error) {
      console.error("Error adding employee:", error);
      Alert.alert(
        "Error",
        `Failed to add employee: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            position: "",
            department: "",
          }}
          validationSchema={EmployeeSchema}
          onSubmit={handleFormSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.form}>
              {/* Full Name */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Full Name</Text>
                <Input
                  placeholder="Full Name"
                  value={values.name}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                />
                {errors.name && touched.name && (
                  <Text style={styles.error}>{errors.name}</Text>
                )}
              </View>

              {/* Email */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email Address</Text>
                <Input
                  placeholder="Email Address"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  keyboardType="email-address"
                />
                {errors.email && touched.email && (
                  <Text style={styles.error}>{errors.email}</Text>
                )}
              </View>

              {/* Phone */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Phone Number</Text>
                <Input
                  placeholder="Phone Number"
                  value={values.phone}
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  keyboardType="phone-pad"
                />
                {errors.phone && touched.phone && (
                  <Text style={styles.error}>{errors.phone}</Text>
                )}
              </View>

              {/* Position */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Position</Text>
                <Input
                  placeholder="Position"
                  value={values.position}
                  onChangeText={handleChange("position")}
                  onBlur={handleBlur("position")}
                />
                {errors.position && touched.position && (
                  <Text style={styles.error}>{errors.position}</Text>
                )}
              </View>

              {/* Department */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Department</Text>
                <Input
                  placeholder="Department"
                  value={values.department}
                  onChangeText={handleChange("department")}
                  onBlur={handleBlur("department")}
                />
                {errors.department && touched.department && (
                  <Text style={styles.error}>{errors.department}</Text>
                )}
              </View>

              {/* Buttons */}
              <View style={styles.buttonRow}>
                <Button
                  title="Cancel"
                  onPress={() => router.push("/")}
                  style={styles.cancelButton}
                  disabled={isSubmitting}
                />
                <Button
                  title={isSubmitting ? "Saving..." : "Submit"}
                  onPress={() => handleSubmit()}
                  style={styles.submitButton}
                  disabled={isSubmitting}
                />
              </View>

              {/* Loading Spinner */}
              {isSubmitting && (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#44613A" />
                </View>
              )}
            </View>
          )}
        </Formik>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
    maxWidth: 400,
  },
  form: {
    width: "100%",
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontWeight: "bold",
    color: "#333",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: "#f44336",
    flex: 1,
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: "#44613A",
    flex: 1,
    marginLeft: 10,
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 10,
  },
});

export default EmployeeForm;
