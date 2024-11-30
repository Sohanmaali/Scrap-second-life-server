// import { QueryOptions } from "mysql2";
import { Request } from 'express';
// import { PaginateOptions } from "mongoose";

const customLabels = {
  docs: 'data',
  totalDocs: 'total',
  limit: 'per_page',
  page: 'current_page',
  nextPage: 'next',
  prevPage: 'prev',
  totalPages: 'last_page',
};
export async function generateOptions(
  req: Request,
  defaultPage = 1,
  defaultLimit = 20,
): Promise<any> {
  // ): Promise<PaginateOptions>

  const options: any = {
    page: parseInt(req.query.page as string, 10) || defaultPage,
    limit: parseInt(req.query.count as string, 10) || defaultLimit,
    skip:
      (parseInt(req.query.page as string, 10) - 1) *
      parseInt(req.query.count as string, 10),
    sort: { created_at: 'desc' },
    customLabels: customLabels,
  };

  return options;
}

export async function CustomPagination(
  req,
  pipeline,
  Model,
  defaultPage = 1,
  defaultLimit = 20,
) {
  const pageNumber = Number(req.query?.page) || defaultPage;
  const pageSize = Number(req.query?.count) || defaultLimit;

  const options = await generateOptions(req);
  const dataAggregationPipeline = [...pipeline];

  dataAggregationPipeline.push(
    {
      $skip: (pageNumber - 1) * pageSize,
    },
    {
      $limit: pageSize,
    },
  );

  const currentPageData = await Model.aggregate(
    dataAggregationPipeline,
    options,
  );
  const countAggregationPipeline = [...pipeline];
  countAggregationPipeline.push({
    $count: 'total',
  });

  const totalDataCountResult = await Model.aggregate(countAggregationPipeline);
  const totalDataCount =
    totalDataCountResult.length > 0 ? totalDataCountResult[0].total : 0;
  const totalPages = Math.ceil(totalDataCount / pageSize);
  return {
    data: currentPageData,
    total: totalDataCount,
    per_page: pageSize,
    last_page: totalPages,
    current_page: pageNumber,
    pagingCounter: (pageNumber - 1) * pageSize + 1,
    hasPrevPage: pageNumber > 1,
    hasNextPage: pageNumber < totalPages,
    prev: pageNumber > 1 ? pageNumber - 1 : null,
    next: pageNumber < totalPages ? pageNumber + 1 : null,
  };
}

export async function BuilderCustomPagination(req, data, total) {
  const options = await generateOptions(req);
  const totalPages = Math.ceil(total / options.limit);
  const nextPage = options.page < totalPages ? options.page + 1 : null;
  const prevPage = options.page > 1 ? options.page - 1 : null;

  return {
    data,
    total,
    per_page: options.limit,
    last_page: totalPages,
    current_page: options.page,
    pagingCounter: (options.page - 1) * options.limit + 1,
    hasPrevPage: options.page > 1,
    hasNextPage: options.page < totalPages,
    prev: prevPage,
    next: nextPage,
  };
}
