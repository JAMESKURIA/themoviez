import { FlashList } from '@shopify/flash-list'
import { useLocalSearchParams } from 'expo-router'
import { useForm } from 'react-hook-form'
import { Dimensions, ScrollView, Text, View } from 'react-native'
import { Avatar } from 'react-native-paper'
import { Rating } from 'react-native-ratings'

import { MovieCard } from '.'

import { moviesList } from '@/modules/misc/data/movies'
import UiButton from '@/modules/misc/ui/button'
import { appColors } from '@/utils/color-theme'
import { useColorScheme } from 'nativewind'

export default function MovieDetails() {
    const { movieId } = useLocalSearchParams()
    const movie = moviesList.find((m) => String(m.id) === String(movieId))
    const { height: screenHeight } = Dimensions.get('screen')

    const { control } = useForm()

    const { colorScheme } = useColorScheme()
    return (
        <ScrollView className="flex-1 bg-primary">
            <View className="h-56" style={{ height: screenHeight / 2.3 }}>
                <MovieCard movie={movie!} fullImage showTitle imageClassName="rounded-none" />
            </View>
            <View className="p-5 pt-10">
                <View className="flex-row justify-between">
                    <View>
                        <View className="flex-row items-center gap-2">
                            <Text className="font-semibold text-3xl text-accent">
                                {movie?.title}
                            </Text>
                            <Text className="text-lg text-accent-light">{movie?.year}</Text>
                        </View>
                        <Text className="text-xl text-accent-light">Marvel Studios</Text>
                    </View>
                    <View>
                        <View className="flex-row items-center gap-2">
                            <Rating
                                ratingBackgroundColor="red"
                                ratingCount={5}
                                startingValue={5}
                                readonly
                                tintColor={appColors[colorScheme]['--color-primary-default']}
                                imageSize={14}
                            />
                        </View>
                        <Text className="text-sm text-accent-light">from 327 users</Text>
                    </View>
                </View>
                <Text className="text-lg leading-8 py-5 text-accent-light ">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore vero soluta
                    quia possimus eos quae laborum quasi rem eveniet voluptatem. Lorem ipsum dolor
                    sit amet consectetur, adipisicing elit. Repellat fugit necessitatibus nulla
                    eligendi placeat obcaecati impedit provident quibusdam asperiores, quod mollitia
                    doloremque eius delectus similique facere rem natus sequi in?
                </Text>
            </View>

            <View className="w-full">
                <FlashList
                    data={moviesList}
                    keyExtractor={(item) => item.id.toString()}
                    estimatedItemSize={15}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View className="p-5 flex-row items-center">
                            <Avatar.Image
                                size={60}
                                source={require('../../assets/images/avatar.jpg')}
                            />
                            {/* <Avatar.Text size={60} label="JD" /> */}
                            <View className="py-2 bg-primary-light rounded-r-full px-6 pl-10 -ml-7 -z-10">
                                <Text className="text-accent text-lg">Jane Doe</Text>
                                <Text className="text-accent-light text-sm">as MegaMind</Text>
                            </View>
                        </View>
                    )}
                />
            </View>
            <View className="p-5">
                <UiButton>Watch Now</UiButton>
            </View>
        </ScrollView>
    )
}
