import { ShopCard } from './ShopCard'

export const ProfileBody: React.FC = () => {
  return (
    <div className="space-y-4 px-4">
      <div className="border-2 rounded-md py-3 px-4">
        <p className="text-md font-bold">Історія відвідувань</p>
      </div>
      <div className="border-2 rounded-md py-3 px-4">
        <p className="text-md font-bold">Налаштування профілю</p>
      </div>
      <div className="space-y-4">
        <h1 className="text-md font-bold">Пропозиції для вас</h1>
        <ShopCard
          name="Барберня 'Парубок'"
          id="1"
          logo="https://speakaboutit.s3.eu-north-1.amazonaws.com/default_avatar.png"
          text="-20% у день народження саме у нас!"
        />
      </div>
    </div>
  )
}
