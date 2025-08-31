import { createStackNavigator } from "@react-navigation/stack";
import { FamilyCreatePage, FamilyCreatePageProps } from "./family-create-page/FamilyCreatePape";

export const FamilyStackMeta = {
    name: 'Family',
    screens: {
        familyEdit: 'FamilyEdit',
    },
};

export type FamilyStackParamList = {
    familyEdit: FamilyCreatePageProps;
};

const FamilyStack = createStackNavigator<FamilyStackParamList>();

export function FamilyNavigator() {
    return (
        <FamilyStack.Navigator>
            <FamilyStack.Screen
                name="familyEdit"
                component={FamilyCreatePage}
                options={{ title: '家族情報編集' }}
            />
        </FamilyStack.Navigator>
    );
}
