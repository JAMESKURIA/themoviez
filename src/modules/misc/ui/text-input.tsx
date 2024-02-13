import React from 'react'
import { Control, FieldValues, Path, useController } from 'react-hook-form'
import { HelperText, TextInput } from 'react-native-paper'

type TextInputProps = React.ComponentProps<typeof TextInput>

type InputProps<T extends FieldValues> = TextInputProps & {
    control: Control<T>
    name: Path<T>
    rules?: Parameters<Control<T>['register']>[1]
    // name: keyof T;
}

export function UIInput<T extends FieldValues>({ control, name, rules, ...props }: InputProps<T>) {
    const {
        field,
        fieldState: { error },
    } = useController({
        name,
        control,
        rules,
    })

    const hasError = Boolean(error)

    return (
        <>
            {/* <Text variant="bodyMedium" className="pb-1 font-semibold text-red-500">
                {props.label ?? ''}
            </Text> */}
            <TextInput
                {...field}
                onChangeText={field.onChange}
                mode="outlined"
                error={hasError}
                contentStyle={{ borderRadius: 100 }}
                // style={tw.style('bg-white h-12')}
                {...props}
                // style={[props.style, { backgroundColor: 'transparent' }]}
                // outlineStyle={tw.style('rounded-lg')}
                label={props?.label ?? ''}
            />

            <HelperText type="error" visible={hasError}>
                {error?.message}
            </HelperText>
        </>
    )
}
