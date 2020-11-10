/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { Cog } from '@styled-icons/boxicons-solid';

export const Container = styled.div`
  width: 30%;
  height: 500px;
`;

export const DropdownContainer = styled.div`
  position: relative;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid lightgray;
`;

export const Icon = styled(Cog)`
  position: absolute;
  size: 0.1;
`;
