<?php

namespace App\Repository;

use App\Entity\LtParker;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method LtParker|null find($id, $lockMode = null, $lockVersion = null)
 * @method LtParker|null findOneBy(array $criteria, array $orderBy = null)
 * @method LtParker[]    findAll()
 * @method LtParker[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class LtParkerRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, LtParker::class);
    }

    // /**
    //  * @return LtParker[] Returns an array of LtParker objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('l.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?LtParker
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
