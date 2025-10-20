import { GetServerSideProps } from 'next'
import { supabaseServer } from '@/supabase/supabaseServer'
import NotFoundPage from './notfound'

type Props = {
  notFound?: boolean
  uuid?: string | null
}

export default function ShortLinkPage({ notFound, uuid }: Props) {
  if (notFound) return <NotFoundPage uuid={uuid ?? 'unknown'} />
  return null
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { uuid } = context.params as { uuid: string }

  if (!uuid) {
    return { props: { notFound: true, uuid: null } }
  }

  const { data, error } = await supabaseServer
    .from('uuids')
    .select('link')
    .eq('uuid', uuid)
    .single()

  if (error || !data) {
    return { props: { notFound: true, uuid } }
  }

  return {
    redirect: {
      destination: data.link,
      permanent: false,
    },
  }
}
