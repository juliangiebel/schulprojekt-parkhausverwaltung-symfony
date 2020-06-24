<?php

namespace App\Entity;

use App\Repository\TicketRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\ExistsFilter;


/**
 * @ORM\Entity(repositoryClass=TicketRepository::class)
 * @ApiResource
 * @ApiFilter(SearchFilter::class, properties={"occupancy": "exact"})
 * @ApiFilter(ExistsFilter::class)
 */
class Ticket
{
	/**
	 * @var int Ticket id
	 *
	 * @ORM\Id()
	 * @ORM\GeneratedValue()
	 * @ORM\Column(type="integer")
	 */
	private $id;

	/**
	 * @var Occupancy The corresponding occupancy
	 *
	 * @ORM\OneToOne(targetEntity="Occupancy")
	 * @ORM\JoinColumn(name="occupancy", referencedColumnName="id")
	 */
	private $occupancy;

	/**
	 * @var \DateTimeInterface The time the ticket was paid, controlls the abillity to exit
	 *
	 * @ORM\Column(type="datetime", nullable=true)
	 */
	private $paid;

	public function getId(): ?int {
		return $this->id;
	}

	public function getOccupancy(): ?Occupancy {
		return $this->occupancy;
	}

	public function setOccupancy(Occupancy $occupancy) {
		$this->occupancy = $occupancy;

		return $this;
	}

	public function getPaid(): ?\DateTimeInterface {
		return $this->paid;
	}

	public function setPaid(?\DateTimeInterface $paid): self {
		$this->paid = $paid;

		return $this;
	}
}
