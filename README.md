I got pretty far with the acceptance criteria for V1.  My styles are a bit rough and I didn’t complete the final animation where the progress bar disappears.

# Broad Overview of What I did:

Most of the logic for my exercise is in src/progress_bar/services/ExampleService.  I created a react hook to interface with ExampleService.  My version of ProgressBar is a fairly simple component that responds to the state it gets from ExampleService.

# What Could I Have Done Better?:

- I spent the bulk of my time on ExampleService and its test.  There are off the shelf state managers that could have saved me a lot of time.  But I went into this thinking I shouldn’t introduce any new dependencies.  My general philosophy is to not introduce a dependency unless it is really necessary.  However, I think I could have accomplished a lot more if I had.
- I didn’t get any unit tests done for my React hooks or components.  This would have been difficult because the project’s test suite didn’t have anything like JSDom or ReactTestRender setup.  I didn’t want to take the time to do that.  In my experience that can take a bit of trouble shooting and that’s time I didn’t want to waste.
- I wish I had more time to spend on styling and making things look a little more polished.
- I didn’t get the chance to work on anything in the V2 exercise :(
