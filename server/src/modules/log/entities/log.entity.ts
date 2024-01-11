import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Log {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  ip: string;

  @Column('integer')
  method: string;

  @Column('integer')
  status: number;

  @Column('integer')
  time: number;

  @Column('text')
  path: string;

  /**
   * 0(false) 또는 1(true) 값
   */
  @Column('integer')
  isLogin: number;

  @Column('integer')
  createdAt: number;
}
