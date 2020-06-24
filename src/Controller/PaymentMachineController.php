<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/payment")
 */
class PaymentMachineController extends AbstractController
{
    /**
     * @Route("/machine", name="payment_machine")
     */
    public function index()
    {
        return $this->render('payment_maschine/index.html.twig', [
            'controller_name' => 'PaymentMaschineController',
        ]);
    }
}
