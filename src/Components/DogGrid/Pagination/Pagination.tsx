import {
  Container,
  NextButton,
  PrevButton,
  PageNumber,
} from "./Pagination.styles";

type Props = {
  changePage: (page: number) => void;
  page: number;
  hasNextPage: boolean;
};

const Pagination = (props: Props) => {
  const { changePage, page, hasNextPage } = props;

  return (
    <Container>
      <PrevButton onClick={() => changePage(page - 1)} disabled={page === 1} />
      <PageNumber>{page}</PageNumber>
      <NextButton
        onClick={() => changePage(page + 1)}
        disabled={!hasNextPage}
      />
    </Container>
  );
};

export default Pagination;
