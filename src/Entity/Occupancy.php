<?php

namespace App\Entity;

use App\Repository\OccupancyRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;

/**
 * @ORM\Entity(repositoryClass=OccupancyRepository::class)
 * @ApiResource
 */
class Occupancy
{
    /**
     * @var int The occupancy id
     *
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @var string The occupants license plate
     *
     * @ORM\Column(type="string", length=255)
     */
    private $licensePlate;

    /**
     * @var \DateTimeInterface
     *
     * @ORM\Column(type="datetime")
     */
    private $entryDate;

    /**
     * @var \DateTimeInterface
     *
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $exitDate;

    /**
     * @var LtParker
     *
     * @ORM\ManyToOne(targetEntity="LtParker")
     * @ORM\JoinColumn(name="lt_parker", referencedColumnName="id")
     */
    private $ltParker;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLicensePlate(): ?string
    {
        return $this->licensePlate;
    }

    public function setLicensePlate(string $licensePlate): self
    {
        $this->licensePlate = $licensePlate;

        return $this;
    }

    public function getEntryDate(): ?\DateTimeInterface
    {
        return $this->entryDate;
    }

    public function setEntryDate(\DateTimeInterface $entryDate): self
    {
        $this->entryDate = $entryDate;

        return $this;
    }

    public function getExitDate(): ?\DateTimeInterface
    {
        return $this->exitDate;
    }

    public function setExitDate(?\DateTimeInterface $exitDate): self
    {
        $this->exitDate = $exitDate;

        return $this;
    }

    public function getLtParker(): ?LtParker
    {
        return $this->ltParker;
    }

    public function setLtParker(?LtParker $ltParker): self
    {
        $this->ltParker = $ltParker;

        return $this;
    }

    // public function __toString()
    // {
    //     return strval($this->id);
    // }
}
