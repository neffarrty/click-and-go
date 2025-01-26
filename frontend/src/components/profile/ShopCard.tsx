interface ShopCardProps {
  id: string
  name: string
  logo: string
  text: string
}

export const ShopCard: React.FC<ShopCardProps> = ({ id, name, logo, text }) => {
  return (
    <div className="flex items-center bg-white border-2 rounded-md px-4 py-4 shadow-sm">
      <div className="max-w-16 max-h-16 flex items-center justify-center rounded-full overflow-hidden border border-gray-300">
        <img
          src={logo}
          alt={`${name} avatar`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="ml-4">
        <h1 className="text-sm font-bold">{text}</h1>
        <p className="text-xs text-gray-600">{name}</p>
      </div>
    </div>
  )
}
