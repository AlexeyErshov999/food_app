import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {
    Modal,
    Card,
    Input,
    Button,
    Text,
    Layout,
    IndexPath,
    Select,
    SelectItem,
    Divider,
} from '@ui-kitten/components';
import {styles} from "@/app/widgets/CreateProductModal/styles";
import {InputField} from "@/app/components/InputField/InputField";
import {foodTypes, ICreateProductModalProps} from "@/app/widgets/CreateProductModal/types";
import {Ionicons} from "@expo/vector-icons";
import {DatabaseService} from "@/app/database/DatabaseService";
import {TableType} from "@/app/database/types";

const CreateProductModal = ({visible, onClose, onSaveProduct}: ICreateProductModalProps) => {
    const db = DatabaseService.getInstance()
    const [productName, setProductName] = useState('');
    const [proteins, setProteins] = useState('');
    const [carbohydrates, setCarbohydrates] = useState('');
    const [fats, setFats] = useState('');
    const [calories, setCalories] = useState('');
    const [weight, setWeight] = useState('100');
    const [selectedTypeIndex, setSelectedTypeIndex] = useState<number>(0);

    const handleCreate = async () => {
        const productType = foodTypes[selectedTypeIndex - 1]?.toLowerCase()
        const productData = {
            name: productName,
            weight: parseFloat(weight) || 100,
            proteins: parseFloat(proteins) || 0,
            carbohydrates: parseFloat(carbohydrates) || 0,
            fats: parseFloat(fats) || 0,
            calories: parseFloat(calories) || 0
        };

        await db.addFoodToTable(productType as TableType, productData)

        resetForm();
        onSaveProduct();
    };

    const resetForm = (): void => {
        setProductName('');
        setProteins('');
        setCarbohydrates('');
        setFats('');
        setCalories('');
        setWeight('100');
        setSelectedTypeIndex(0);
    };

    return (
        <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={onClose}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <Card disabled={true} style={styles.card}>
                    <Layout style={styles.header}>
                        <Text category='h5'>Новая запись</Text>
                        <Button
                            appearance='ghost'
                            status='basic'
                            size='small'
                            onPress={onClose}
                            accessoryLeft={(props) => <Ionicons name="close" size={20} {...props} />}
                        />
                    </Layout>

                    <Divider style={styles.divider}/>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        {/* Тип */}
                        <Layout style={styles.inputContainer}>
                            <Text category='c1' appearance='hint' style={styles.inputLabel}>
                                Выберите тип
                            </Text>
                            <Select
                                selectedIndex={selectedTypeIndex > 0 ? new IndexPath(selectedTypeIndex - 1) : undefined}
                                onSelect={(index) => setSelectedTypeIndex((index as IndexPath).row + 1)}
                                size='medium'
                                style={styles.input}
                                placeholder="Выберите тип"
                                value={selectedTypeIndex > 0 ? foodTypes[selectedTypeIndex - 1] : ''}
                            >
                                {foodTypes.map((unit, index) => (
                                    <SelectItem key={index} title={unit}/>
                                ))}
                            </Select>
                        </Layout>

                        {/* Название продукта */}
                        <Layout style={styles.inputContainer}>
                            <Text category='c1' appearance='hint' style={styles.inputLabel}>
                                Введите название продукта
                            </Text>
                            <Input
                                value={productName}
                                onChangeText={setProductName}
                                placeholder='Например: Куриное филе'
                                size='medium'
                                style={styles.input}
                            />
                        </Layout>

                        <Text category='c2' appearance='hint' style={styles.sectionHint}>
                            Введите пищевую ценность
                        </Text>

                        {/* Вес и калории */}
                        <Layout style={styles.rowContainer}>
                            <Layout style={styles.unitContainer}>
                                <InputField
                                    label='Вес/Объём (г/м)'
                                    value={weight}
                                    onChange={setWeight}
                                />
                            </Layout>
                            <Layout style={styles.unitContainer}>
                                <InputField
                                    label='Калории (ккал)'
                                    value={calories}
                                    onChange={setCalories}
                                />
                            </Layout>
                        </Layout>

                        {/* БЖУ */}
                        <Layout style={styles.rowContainer}>
                            <InputField label='Белки (г)' value={proteins} onChange={setProteins}/>
                            <InputField label='Жиры (г)' value={fats} onChange={setFats}/>
                            <InputField label='Углеводы (г)' value={carbohydrates} onChange={setCarbohydrates}/>
                        </Layout>

                        {/* Кнопки */}
                        <Layout style={styles.buttonContainer}>
                            <Button
                                style={styles.cancelButton}
                                appearance='outline'
                                status='basic'
                                onPress={onClose}
                            >
                                Отмена
                            </Button>
                            <Button
                                style={styles.createButton}
                                status='primary'
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