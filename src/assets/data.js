const data = [
    {
        "id": 1,
        "title": "Introduction",
        "text": ["In this tutorial we will explore color deficiency or color blindness. How does a color-blind person see color? How do we predict/simulate the color perception of a color-blind person? Understanding the mechanisms of color deficiency would allow you to appreciate daltonization, techniques that help regain some of the color perception for a color blind person.",
    "In some sense predicting/synthesizing the view of the world as it appears to a deficient color vision is a philosophical issue: can we ever be sure of another’s (color) sensation? Naturally, there are many competing theories to color blindness. They vary in the assumptions they make about the mechanisms behind color-blind vision. This tutorial is based on the theory described in the classic paper by Brettel et al. (1997).(Reference 1)"]
    },
    {
        "id": 2,
        "title": "Color blindess",
        "text": [
            "Color blindness is a hereditary condition. Around 1 in 12 males are affected by color blindness while 1 in 200 females are affected by color blindness. The reason more males are impacted is because color blindness occurs when there is a defect in the X chromosome. Since males have one X chromosome compared to two in females, males are more susceptible to X chromosome defection. It’s almost like females have built-in Dual Modular Redundancy for color perception!",
            "A person who has all three types of cones working normally is referred to as a trichromat. A person who has two types of cones working is referred to as a dichromat. Finally, the most rare of them all is a monochromat who has one type of cone working. A dichromat is further classified into Protanopia, who has a defective L cone, Deuteranopia, who has a defective M cone, and Tritanopia, who has a defective S cone.",
            "In addition to dichromatic vision (protanopia, deuteranopia, and tritanopia) where one cone type is completely missing, there is also anomalous trichromatic vision, again of three different kinds (called protanomaly, deuteranomaly, and tritanomaly), where the corresponding cone cells, instead of being absent, are mutated to peak at a different wavelength from that in the normal cone cells. Anomalous trichromats are sometimes called “color weak” instead of color blind.",
            "In this tutorial, we will focus on dichromatic vision and use protanopia as a running example, but the same principles apply to the other kinds of color blindness.",
        ]
    },
    {
        "id": 3,
        "title": "Implementation Notes",
        "text": [
            "The particular LMS cone sensitivities used here are the Hunt-Pointer-Estevez cone sensitivities, where the cone sensitivities are normalized such that they produce an equal LMS value for Equal Energy White(EEW).",
            "Hawk-eyed readers might notice that the plane we plot above is actually two half-planes sharing one side. But these two half-planes are almost parallel such that they look like one single plane.",
            "To understand why Brettel et al. constructed two planes, consider this question: should [0, 0, 0] in LMS, the color where there is no light, appear pitch dark for both a dichromat and a trichromat? The answer should be yes. That is, [0, 0, 0] (let’s call it O) is also an isochrome. So we have 4 points. These 4 points don’t exactly lie on the same plane, and we have to use two half-planes to capture all 4 points; each plane will be anchored by 3 of the 4 isochromes.",
            "The first half-plane is anchored by O, 475 nm, and EEW. The second half-plane is anchored by O, 575 nm, and EEW. That is, the two half-planes share the same side of O-EEW. We won’t show it here, but if you do the math you’ll see that the two planes are almost parallel to each other. Their normals are [1, -1.16, 0.12] and [1, -1.12, 0.09], respectively.",
            "Having O as an isochrome is important because it ensures that luminance doesn’t affect whether a color is an isochrome or not. If a color C is an isochrome, i.e., lying on the projection plane P, it’s guaranteed that any color on the line O-C lies on plane P too. That is, any color on the O-C line is an isochrome. What do colors on the O-C line have in common? They have the same chromaticity but differ in luminance."
        ]
    },
    {
        "id": 4,
        "title": "General Strategy",
        "text": [
            "The technique to perform color blindness simulation has been taken from the paper, Computerized simulation of color appearance for dichromats by Brettel et al.",
            "To perform the simulation, the paper described deriving two two-dimensional planes. The idea relies on previous studies done on an unilateral color deficient observer. An unilateral color deficient person is color blind in one eye while being trichromat in the other. With their help the study showed that at wavelengths 475nm and 575nm a trichromat and dichromat perceive the color in the same way. Neutral white is perceived in the same way by a dichromat and trichromat. The relevant papers are in references 2,3 and 4.",
            "To define a plane, we need three points. The first one is the origin(O) which is black. The second point is E(neutral white). The third point is 475nm on one plane and 575nm on the other plane."
        ],
    }, 
    {
        "id": 5,
        "title": "Step 1: Finding the planes",
        "text": [
            "As mentioned above we need three points. For neutral white we have picked Equal Energy White, an illuminant that has SPD of one at every wavelength. From previous studies, it is safe though not a strict requirement, we have assumed 475nm and 575nm to be invariant colors."
        ]
    },
    {
        "id": 6,
        "title": "Step 2: Simulation",
        "text": [
            "An image is a collection of (non-linear) RGB values. To simulate how a color blind person would see the image, we have to take the image through multiple color spaces. First is to move from sRGB to linear RGB which involves removing the gamma from the pixel. Next is to move to XYZ color space. Finally, we move to LMS color space under a particular illuminant.",
            "Next, we find a point on the plane that has the same M and S values as the converted pixel value, however the L value is changed. If Q(L',M,S) describes the point on the plane and N(x,y,z) is the normal for the plane we have"
        ]
    },
    {
        "id": 7,
        "title": "Taking an eye test",
        "text": ["Protanopia or red-green deficiency is the most common color blindess. People with Protanopia don't see the color red as how a trichromat would. For them it looks like a yellow color. One of the common problems with such a deficiency is the difficulty to pick ripe fruits in particular apples. Sometimes a Protanope would have trouble distinguishing traffic signals when they are in a different country as the order in which the signals are arranged can be different.",
            "The Ishihara test is a color perception test to detect red-green deficiency. You might have seen the image below on the internet. It was named after its designer, Shinobu Ishihara, a professor at the University of Tokyo, who first published his tests in 1917. The test consists of identifying the number in the image. For someone with protanopia, they would not be able to distinguish the red from the surrounding greens.",
            "In this section, the planes and image are fixed. All you have to do is click the Simulate button. Notice how the colors look yellowish in the image and there is no way to make out the original number."]
    },
    {
        "id": 8,
        "title": "References",
        "text": ["1) Computerized simulation of color appearance for dichromats",
            "2) D.B. Judd, \"Color perceptions of deuteranopic and protanopic observers\"",
            "3) K.H. Ruddock, \"Psychophysics of inherited color vision deficiencies\"",
            "4) M. Alpern, K. Kitahara and D.H. Krantz, \"Perception of colour in unilateral tritanopia\""]
    },
    {
        "id": 9,
        "title": "Intuition",
        "text": [
            "Normal color perception is 3D in that each color can be represented by a point in a 3D space. The plot below plots the spectral locus in the LMS space. We know that the colors that a color-blind person can see are a subset of the colors that people with normal vision can see. So the question is, where do those colors lie in the LMS space?"
        ]
    }
]

export default data;