<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class ExitMachineController extends AbstractController
{
    /**
     * @Route("/exit/machine", name="exit_machine")
     */
    public function index()
    {
        return $this->render('exit_machine/index.html.twig', [
            'libPath' => '../../../public/lib',
        ]);
    }
}
