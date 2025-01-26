interface ProfileHeaderProps {
  name: string
  avatarPath: string
  subscribes: number
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  avatarPath,
  subscribes
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white border-b">
      <div className="flex items-center gap-4">
        <div className="max-w-20 max-h-20 flex items-center justify-center rounded-full overflow-hidden border border-gray-300">
          <img
            src={avatarPath}
            alt={`${name} avatar`}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-lg font-bold">{name}</h1>
          <p className="text-sm text-gray-600">{subscribes} підписки</p>
        </div>
      </div>
      <div className="w-8 h-8 flex flex-col justify-center items-center">
        <span className="block w-6 h-0.5 bg-black mb-1"></span>
        <span className="block w-6 h-0.5 bg-black mb-1"></span>
        <span className="block w-6 h-0.5 bg-black"></span>
      </div>
    </div>
  )
}
