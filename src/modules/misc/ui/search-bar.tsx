import { Control, FieldValues, Path, useController } from 'react-hook-form'
import { Searchbar } from 'react-native-paper'

type SearchBarProps = React.ComponentProps<typeof Searchbar>

type InputProps<T extends FieldValues> = SearchBarProps & {
    control: Control<T>
    name: Path<T>
    rules?: Parameters<Control<T>['register']>[1]
    // name: keyof T;
}

export function UISearchBar<T extends FieldValues>({
    control,
    name,
    rules,
    ...props
}: InputProps<T>) {
    const {
        field,
        fieldState: { error },
    } = useController({
        name,
        control,
        rules,
    })

    // cssInterop(UIInput, {
    //     outlineClassName: 'outlineStyle',
    //     contentClassName: 'contentStyle',
    // })

    return (
        // <UIInput
        //     placeholder="Search for content"
        //     control={control}
        //     name="houseName"
        //     mode="outlined"
        //     outlineClassName="rounded-full bg-primary text-accent"
        //     contentClassName="text-accent"
        //     keyboardType="web-search"
        // />
        <Searchbar {...field} onChangeText={field.onChange} placeholder="Search for content" />
    )
}
