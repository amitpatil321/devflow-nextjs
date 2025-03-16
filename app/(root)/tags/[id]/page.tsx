import QuestionCard from "@/components/cards/QuestionCard";
import NoResults from "@/components/shared/NoResults";
import Pagination from "@/components/shared/Pagination";
import LocalSearch from "@/components/shared/search/LocalSearch";
import paths from "@/constants/paths";
import { questionsBytagId } from "@/lib/actions/tag.action";

interface TagProps {
  params: {
    id: string;
  };
  searchParams: {
    page: string;
  };
}

interface Params {
  params: { id: string };
}

export async function generateMetadata({ params }: Params) {
  const { response } = await questionsBytagId({
    tagId: params.id,
  });
  return {
    title: `${response.name} | Dev Overflow`,
  };
}

const page = async ({ params, searchParams }: TagProps) => {
  const { page } = searchParams;
  const { response, total } = await questionsBytagId({
    tagId: params.id,
    page,
  });

  return (
    <>
      <h1 className="text-dark100_light900 h1-bold">{response.name}</h1>

      <div className="mt-11 w-full">
        <LocalSearch
          route={paths.home}
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search tag questions..."
          otherClasses="flex-1"
        />
      </div>

      <section className="mt-6 flex w-full flex-col gap-6">
        {response.questions.length > 0 ? (
          response.questions.map((question: any) => (
            <QuestionCard key={question._id} question={question} />
          ))
        ) : (
          <NoResults
            title="There's no questions to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
        discussion. our query could be the next big thing others learn from. Get
        involved! 💡"
            link={paths.askQuestion}
            linkText="Ask a question"
          />
        )}
      </section>

      <div className="mt-6">
        <Pagination total={total} />
      </div>
    </>
  );
};

export default page;
