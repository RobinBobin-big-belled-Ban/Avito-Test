import React, { FC } from 'react'
import { Pagination as PaginationAntd } from 'antd'
import { PaginationProps } from 'antd/lib/pagination'

interface Props extends PaginationProps {}

const Pagination: FC<Props> = ({ ...props }) => {
  return <PaginationAntd {...props} />
}

export default Pagination
