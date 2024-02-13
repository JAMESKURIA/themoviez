import { FlashList } from '@shopify/flash-list'
import { Asset } from 'expo-asset'
import { useColorScheme } from 'nativewind'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Dimensions, Image, Pressable, ScrollView, Text, View } from 'react-native'

import { LOG } from '@/lib/logger'
import { moviesList } from '@/modules/misc/data/movies'
import { UISearchBar } from '@/modules/misc/ui'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

type Movie = (typeof moviesList)[number]

const logger = LOG.extend('HomePage')

const { height: screenHeight } = Dimensions.get('window')

export default function Page() {
    const { toggleColorScheme, colorScheme } = useColorScheme()
    const { control } = useForm()

    return (
        <ScrollView className="flex-1 ">
            <SafeAreaView className="flex-1 min-h-screen bg-primary-light ">
                <View className="px-5 pt-10 pb-5">
                    <Text className="text-3xl  text-accent-light pb-5">Search for content</Text>
                    <UISearchBar control={control} name="search" value="" />
                </View>
                <Text className="text-2xl text-accent-light px-5">Categories</Text>
                <View className="">
                    <FlashList
                        estimatedItemSize={100}
                        horizontal
                        data={moviesList}
                        renderItem={({ item }) => (
                            <View className="w-44 h-56">
                                <MovieCard movie={item} showTitle />
                            </View>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ padding: 8 }}
                        ItemSeparatorComponent={() => <View className="w-5" />}
                    />
                </View>
                <View className="">
                    <Text className="text-2xl text-accent-light p-5 pb-0">Most searched</Text>
                    <View className="flex-1 w-full" style={{ minHeight: screenHeight / 2 }}>
                        <MoviesRow />
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

function MoviesRow() {
    return (
        <FlashList
            estimatedItemSize={10}
            numColumns={3}
            data={moviesList}
            renderItem={({ item }) => (
                <Pressable onPress={() => router.push(`/${item.id}`)} className="h-44 w-full p-3">
                    <MovieCard movie={item} />
                </Pressable>
            )}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <View className="w-full h-10" />}
            contentContainerStyle={{ padding: 8 }}
        />
    )
}

export function MovieCard({
    movie,
    showTitle,
    imageClassName,
    fullImage,
}: {
    movie: Movie
    showTitle?: boolean
    imageClassName?: string
    fullImage?: boolean
}) {
    const uri = Boolean(fullImage)
        ? Asset.fromModule(movie.image.full)?.uri
        : Asset.fromModule(movie.image.thumbnail)?.uri
    return (
        <View className="justify-center w-full gap-2 ">
            <Image
                source={{ uri }}
                className={`${!showTitle ? 'h-[85%]' : 'h-full'} rounded-lg ${imageClassName}`}
                resizeMethod="resize"
                resizeMode="cover"
            />
            {!showTitle ? (
                <View className="items-center">
                    <Text className="text-accent text-center">{movie.title}</Text>
                    <Text className="text-accent-light text-center">{movie.year}</Text>
                </View>
            ) : null}
        </View>
    )
}
