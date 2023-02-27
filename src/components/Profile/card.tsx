import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface ICardCustom {
  minWidth: number;
  title?: string;
  children: JSX.Element[] | JSX.Element;
  height: number;
}
export default function CardCustom({ minWidth = 275, height = 200, title, children }: ICardCustom): JSX.Element {
  return (
    <Card sx={{ minWidth: minWidth, height: height }}>
      <CardContent>
        {title && (
          <Typography sx={{ fontSize: 14, textAlign: 'center' }} color='text.secondary' gutterBottom>
            {title}
          </Typography>
        )}
        {children}
      </CardContent>
    </Card>
  );
}
