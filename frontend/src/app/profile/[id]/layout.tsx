import { ProfileFooter } from '@/components/profile/ProfileFooter'
import { ProfileHeader } from '@/components/profile/ProfileHeader'
import { Container } from '@/components/ui/Container'

export default function ProfileLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <Container>
      <div className="min-h-screen flex flex-col bg-white">
        <ProfileHeader
          name="Нікіта"
          avatarPath="https://speakaboutit.s3.eu-north-1.amazonaws.com/default_avatar.png"
          subscribes={22}
        />
        <main className="flex-grow px-5 py-5">{children}</main>
        <ProfileFooter />
      </div>
    </Container>
  )
}
