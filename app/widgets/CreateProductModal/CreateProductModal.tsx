import { InputField } from "@/app/components/InputField/InputField";
import { DatabaseService } from "@/app/database/DatabaseService";
import { styles } from "@/app/widgets/CreateProductModal/styles";
import { CATEGORIES_TRANSLATIONS } from "@/app/widgets/CreateProductModal/translations";
import {
    FOOD_TYPES,
    FoodType,
    ICreateProductModalProps,
} from "@/app/widgets/CreateProductModal/types";
import { Ionicons } from "@expo/vector-icons";
import {
    Button,
    Card,
    Divider,
    IndexPath,
    Input,
    Layout,
    Modal,
    Select,
    SelectItem,
    Text,
} from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

const CreateProductModal = ({
  visible,
  onClose,
  onSaveProduct,
}: ICreateProductModalProps) => {
  const [db, setDb] = useState<DatabaseService | null>(null);
  const [productName, setProductName] = useState("");
  const [proteins, setProteins] = useState("");
  const [carbohydrates, setCarbohydrates] = useState("");
  const [fats, setFats] = useState("");
  const [calories, setCalories] = useState("");
  const [weight, setWeight] = useState("100");
  const [category, setCategory] = useState("");
  const [distributor, setDistributor] = useState("");
  const [selectedTypeIndex, setSelectedTypeIndex] = useState<number>(1);

  useEffect(() => {
    DatabaseService.getInstance().then(setDb);
  }, []);

  const handleCreate = async () => {
    if (!db) return;

    const productData = {
      prod_name: productName,
      weight: parseFloat(weight) || 100,
      proteins: parseFloat(proteins) || 0,
      carbohydrates: parseFloat(carbohydrates) || 0,
      fats: parseFloat(fats) || 0,
      calories: parseFloat(calories) || 0,
      category: category,
      distributor: distributor || "Не задано",
    };

    await db.addProduct(productData);

    resetForm();
    onSaveProduct();
    onClose();
  };

  const resetForm = (): void => {
    setProductName("");
    setProteins("");
    setCarbohydrates("");
    setFats("");
    setCalories("");
    setWeight("100");
    setSelectedTypeIndex(0);
    setCategory("");
    setDistributor("");
  };

  return (
    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => {
        onClose();
        resetForm();
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Card disabled={true} style={styles.card}>
          <Layout style={styles.header}>
            <Text category="h5">Новая запись</Text>
            <Button
              appearance="ghost"
              status="basic"
              size="small"
              onPress={() => {
                onClose();
                resetForm();
              }}
              accessoryLeft={(props) => (
                <Ionicons name="close" size={20} {...props} />
              )}
            />
          </Layout>

          <Divider style={styles.divider} />

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Тип */}
            <Layout style={styles.inputContainer}>
              <Text category="c1" appearance="hint" style={styles.inputLabel}>
                Выберите категорию
              </Text>
              <Select
                selectedIndex={
                  selectedTypeIndex >= 0
                    ? new IndexPath(selectedTypeIndex)
                    : undefined
                }
                onSelect={(index) => {
                  const selectedIndex = (index as IndexPath).row;
                  setSelectedTypeIndex(selectedIndex);
                  setCategory(FOOD_TYPES[selectedIndex]);
                }}
                size="medium"
                style={styles.input}
                placeholder="Выберите категорию"
                value={
                  selectedTypeIndex >= 0
                    ? CATEGORIES_TRANSLATIONS[
                        FOOD_TYPES[selectedTypeIndex] as FoodType
                      ]
                    : ""
                }
              >
                {FOOD_TYPES.map((type, index) => (
                  <SelectItem
                    key={index}
                    title={CATEGORIES_TRANSLATIONS[type]}
                  />
                ))}
              </Select>
            </Layout>

            {/* Название продукта */}
            <Layout style={styles.inputContainer}>
              <Text category="c1" appearance="hint" style={styles.inputLabel}>
                Введите название продукта
              </Text>
              <Input
                value={productName}
                onChangeText={setProductName}
                placeholder="Куриное филе"
                size="medium"
                style={styles.input}
              />
            </Layout>

            {/* Откуда продукт */}
            <Layout style={styles.inputContainer}>
              <Text category="c1" appearance="hint" style={styles.inputLabel}>
                Откуда продукт
              </Text>
              <Input
                value={distributor}
                onChangeText={setDistributor}
                placeholder="Магнит"
                size="medium"
                style={styles.input}
              />
            </Layout>

            <Text category="c2" appearance="hint" style={styles.sectionHint}>
              Введите пищевую ценность
            </Text>

            {/* Вес и калории */}
            <Layout style={styles.rowContainer}>
              <Layout style={styles.unitContainer}>
                <InputField
                  label="Вес/Объём (г/м)"
                  value={weight}
                  onChange={setWeight}
                />
              </Layout>
              <Layout style={styles.unitContainer}>
                <InputField
                  label="Калории (ккал)"
                  value={calories}
                  onChange={setCalories}
                />
              </Layout>
            </Layout>

            {/* БЖУ */}
            <Layout style={styles.rowContainer}>
              <InputField
                label="Белки (г)"
                value={proteins}
                onChange={setProteins}
              />
              <InputField label="Жиры (г)" value={fats} onChange={setFats} />
              <InputField
                label="Углеводы (г)"
                value={carbohydrates}
                onChange={setCarbohydrates}
              />
            </Layout>

            {/* Кнопки */}
            <Layout style={styles.buttonContainer}>
              <Button
                style={styles.cancelButton}
                appearance="outline"
                status="basic"
                onPress={() => {
                  onClose();
                  resetForm();
                }}
              >
                Отмена
              </Button>
              <Button
                style={styles.createButton}
                status="primary"
                onPress={handleCreate}
              >
                Создать
              </Button>
            </Layout>
          </ScrollView>
        </Card>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default CreateProductModal;
