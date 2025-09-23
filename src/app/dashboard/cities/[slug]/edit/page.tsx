import EditForm from './EditForm';

interface Props {
  params: { slug: string };
}

export default function EditCityPage({ params }: Props) {
  const title = decodeURIComponent(params?.slug ?? 'City');

  return (
    <div className="min-h-screen p-0">
      <div className="card-surface rounded-xl">
        <div className="flex items-start justify-between mb-6">
          <h1 className="text-3xl font-bold text-primary">Edit {title}</h1>
        </div>

        <EditForm initialTitle={title} />
      </div>
    </div>
  );
}
